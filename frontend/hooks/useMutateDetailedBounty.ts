import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from 'frontend/app/api/axios.api';
import { DetailedBountyResponseSchemaValues } from 'frontend/lib/validation/validation';

export default function useMutateDetailedBounty() {
  const queryClient = useQueryClient();
  const useBounty = (id: number) => {
    return useQuery({
      queryKey: ['bounty'],
      queryFn: async () => {
        const { data } = await instance.get(`/bounty/${id}`);
        return data as DetailedBountyResponseSchemaValues;
      },
    });
  };
  const bountyMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: DetailedBountyResponseSchemaValues;
    }) => instance.patch(`/bounty/${id}`, data),
    onSuccess: () => {
      const keysToInvalidate = [
        'bounties',
        'bounty',
        'bountiesCreated',
        'bountiesClaimed',
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
  });

  const bountyDeletion = useMutation({
    mutationFn: (id: number) => instance.delete(`/bounty/${id}`),
    onSuccess: () => {
      const keysToInvalidate = [
        'bounties',
        'bounty',
        'bountiesCreated',
        'bountiesClaimed',
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
  });

  return {
    bountyDeletion,
    bountyMutation,
    useBounty,
  };
}

import { Spinner } from 'flowbite-react';

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-primary-foreground">
      <Spinner size="xl" color="success" />
      <h2 className="mt-4 text-2xl font-bold">Loading Fresh Groceries</h2>
      <p className="mt-2 text-lg">Please wait while we prepare your organic selection...</p>
    </div>
  );
};

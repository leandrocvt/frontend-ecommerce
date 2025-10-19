interface InputErrorMessagesProps {
  errorMessage?: string;
}

export function ErrorMessages({ errorMessage }: InputErrorMessagesProps) {
  if (!errorMessage) return null;
  return (
    <p className="text-xs text-red-600 mt-1 font-medium">{errorMessage}</p>
  );
}
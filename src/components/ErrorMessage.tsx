type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <h2 className="text-3xl text-center py-5 font-medium">
      {message}
    </h2>
  );
};

export default ErrorMessage;

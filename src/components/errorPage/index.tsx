import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorPage = ({ message, onRetry }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4 text-center px-6">
        <AlertCircle className="w-14 h-14 text-red-500" />

        <div>
          <p className="font-semibold text-lg">Ups, algo salió mal</p>
          <p className="text-sm text-gray-500">
            {message ?? 'Intenta nuevamente en unos segundos.'}
          </p>
        </div>

        {onRetry && (
          <Button onClick={onRetry} className="mt-2">
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;

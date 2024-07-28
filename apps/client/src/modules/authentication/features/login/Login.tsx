import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '../../../../components/ui/alert';
import { Button } from '../../../../components/ui/button';
import { Icons } from '../../../../components/ui/icons';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { useAuthStore } from '../../../../store';
import { useAuthenication } from './hooks';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof schema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loginMutation } = useAuthenication();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      loginMutation.mutate(data, {
        onSuccess: (data) => {
          setUser(data);
        },
      });
      // if()
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-100">
      <div className="w-full max-w-md p-10 rounded-lg">
      <div className="absolute top-12 left-12">
        <Icons.Logo className="w-16 h-16 mr-10" />
      </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-4xl text-center">Login</h1>

          {error && <Alert variant="destructive">{error}</Alert>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>

          <div className="text-center">
            Create an account
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
            <span className="m-1">|</span>
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Login };

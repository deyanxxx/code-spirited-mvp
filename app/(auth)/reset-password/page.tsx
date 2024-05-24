import AuthLayout from '@/components/auth/AuthLayout';
import ResetPassword from '@/components/auth/ResetPassword';

import React, { Suspense } from 'react';

const ResetPasswordPage = () => (
  <AuthLayout>
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  </AuthLayout>
);

export default ResetPasswordPage;
'use client';

import React, { Suspense } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import ConfirmCode from '@/components/auth/ConfirmCode';

const ConfirmCodePage = () => (
  <AuthLayout>
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmCode />
    </Suspense>
  </AuthLayout>
);

export default ConfirmCodePage;

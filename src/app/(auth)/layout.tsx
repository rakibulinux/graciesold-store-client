const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full flex items-center justify-center">{children}</main>
  );
};

export default AuthLayout;
import { Form } from "@remix-run/react";

const Auth = () => {
  return (
    <Form
      className="flex w-full h-full justify-center items-center"
      action="/auth/google"
      method="POST"
    >
      <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold">
        Login with Google
      </button>
    </Form>
  );
};

export default Auth;

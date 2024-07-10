const SignoutButton = () => {
  const signout = async () => {
    const res = await fetch("/api/auth/logout.json");
    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    if (res.redirected) {
      window.location.assign(res.url);
    }
  };

  return (
    <button
      className="border border-0.5 border-zinc-700 text-zinc-500 font-normal hover:text-zinc-100 hover:border-zinc-100 transition-all px-4 py-1 rounded-md"
      type="button"
      onClick={signout}
    >
      Sign out
    </button>
  );
};

export default SignoutButton;

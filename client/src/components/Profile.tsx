const Profile = () => {
  async function signout() {
    const res = await fetch("/api/auth/logout.json");
    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    if (res.redirected) {
      window.location.assign(res.url);
    }
  }

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-[#2c2c2e] hover:bg-[#343436] focus:ring-4 focus:outline-none focus:ring-[#6488ea] font-medium rounded-full text-sm p-1 text-center inline-flex items-center"
        type="button"
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        class="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-[#2c2c2e]"
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a href="/user/requests" class="block px-4 py-2 hover:bg-[#343436]">
              Pending requests
            </a>
          </li>
          <button
            onClick={signout}
            class="w-full flex justify-start px-4 py-2 hover:bg-[#343436] "
          >
            <a>Sign out</a>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Profile;

import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

async function Page() {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    //Fetch users
    const result = await fetchUsers({
      userId: user.id,
      searchString: '',
      pageNumber: 1,
      pageSize: 25
    })

  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        <div className="mt-14 flex flex-col gap-9">
          {result.users.length === 0 ? (
            <p className="no-result">No users</p>
          ) : (
            <>
              {result.users.map((Person) => (
                <UserCard
                  key={Person.id}
                  id={Person.id}
                  name={Person.name}
                  username={Person.username}
                  imgUrl={Person.image}
                  personType='User'


                />
              ) )}
            </>
          ) }
        </div>

    </section>
  )
}

export default Page
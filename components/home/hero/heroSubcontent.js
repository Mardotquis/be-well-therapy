import React from 'react';

export default function HeroSubcontent() {
  const smallContent = 'We can: listen, help, save relationships, keep families together, keep people out of jail and hospitals, reduce depressive and anxiety symptoms,  heal from traumatic experiences, teach how to navigate successfully through life challenges, teach how to correct negative thinking and behavior, create solutions to life problems, resolve conflict, help people grieve and deal with losses, teach how to express all emotions in a healthy way.';

  return (
    <div className="home_hero__subcontent">
      <h2 className="home_hero__subcontent__lgtext">What can we do for you</h2>
      <p className="home_hero__subcontent__smtext">{smallContent}</p>
    </div>
  );
}

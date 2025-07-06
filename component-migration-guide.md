# React Component Migration Guide
## Next.js to Laravel + Inertia.js

This guide provides step-by-step instructions for migrating your existing React components to work with Inertia.js.

---

## 1. Navigation Components

### Original Next.js Component
```jsx
// components/nav/desktopNavbar.js
import React from 'react';
import Link from 'next/link';
import ActiveLink from './activeLink';
import Logo from '../logo';
import { googleMapsLink, phoneNum, fullAddress } from '../constants';

export default function DesktopNavbar() {
  return (
    <nav className="nav">
      <Link href="/"><div className="nav__logo"><Logo /></div></Link>
      <div className="nav__content">
        <ul className="nav__content__links__list">
          <ActiveLink href="/about-us">
            <li className="nav__content__links__list-item">About Us</li>
          </ActiveLink>
          {/* ... other links */}
        </ul>
      </div>
    </nav>
  );
}
```

### Migrated Inertia.js Component
```jsx
// resources/js/Components/nav/DesktopNavbar.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import ActiveLink from './ActiveLink';
import Logo from '../Logo';
import { googleMapsLink, phoneNum, fullAddress } from '../constants';

export default function DesktopNavbar() {
  return (
    <nav className="nav">
      <Link href="/">
        <div className="nav__logo"><Logo /></div>
      </Link>
      <div className="nav__content">
        <ul className="nav__content__links__list">
          <ActiveLink href="/about-us">
            <li className="nav__content__links__list-item">About Us</li>
          </ActiveLink>
          {/* ... other links */}
        </ul>
      </div>
    </nav>
  );
}
```

**Key Changes:**
- `import Link from 'next/link'` → `import { Link } from '@inertiajs/react'`
- File extension: `.js` → `.jsx`
- Component naming: PascalCase

---

## 2. Page Components

### Original Next.js Page
```jsx
// pages/our-staff/index.js
import React from 'react';
import Default from '../../layouts/default';
import Header from '../../components/header';
import EmployeeCards from '../../components/ourStaff/employeeCards/employeeCards';

export default function OurStaff() {
  return (
    <Default meta={{ title: 'Our Staff' }}>
      <Header heading="Meet Our Team" backgroundHeading="Team" />
      <EmployeeCards />
    </Default>
  );
}
```

### Migrated Inertia.js Page
```jsx
// resources/js/Pages/OurStaff.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Default from '../Layouts/Default';
import Header from '../Components/Header';
import EmployeeCards from '../Components/ourStaff/employeeCards/EmployeeCards';

export default function OurStaff({ employees }) {
  return (
    <Default meta={{ title: 'Our Staff' }}>
      <Head title="Our Staff" />
      <Header heading="Meet Our Team" backgroundHeading="Team" />
      <EmployeeCards employees={employees} />
    </Default>
  );
}
```

**Key Changes:**
- Add `Head` component from Inertia for meta tags
- Receive props from Laravel controller
- Update import paths
- Pass data to child components

---

## 3. Data-Driven Components

### Original Static Data Component
```jsx
// components/ourStaff/employeeCards/employeeCards.js
import React, { useEffect } from 'react';
import EmployeeCard from './employeeCard';
import { employees } from '../staffInfo';
import useResize from '../../useResize';

export default function EmployeeCards() {
  const { mobile, resizeFunc } = useResize(800);
  
  useEffect(() => {
    resizeFunc();
    window.addEventListener('resize', resizeFunc);
    return () => {
      window.removeEventListener('resize', resizeFunc);
    };
  }, []);

  const cards = employees.map((employee) => (
    <EmployeeCard
      key={random()}
      name={employee.name}
      certs={employee.certs}
      headshotPath={employee.headshotPath}
      headshotPosition={employee?.headshotPosition}
      modalInfo={employee.modalInfo}
      mobile={mobile}
    />
  ));
  
  return <section className="employee_cards">{cards}</section>;
}
```

### Migrated Database-Driven Component
```jsx
// resources/js/Components/ourStaff/employeeCards/EmployeeCards.jsx
import React, { useEffect } from 'react';
import EmployeeCard from './EmployeeCard';
import useResize from '../../useResize';

const random = require('uuid/v4');

export default function EmployeeCards({ employees }) {
  const { mobile, resizeFunc } = useResize(800);
  
  useEffect(() => {
    resizeFunc();
    window.addEventListener('resize', resizeFunc);
    return () => {
      window.removeEventListener('resize', resizeFunc);
    };
  }, []);

  const cards = employees.map((employee) => (
    <EmployeeCard
      key={random()}
      name={employee.name}
      certs={employee.certs}
      headshotPath={employee.headshot_path}
      headshotPosition={employee.headshot_position}
      modalInfo={employee.modal_info}
      mobile={mobile}
    />
  ));
  
  return <section className="employee_cards">{cards}</section>;
}
```

**Key Changes:**
- Remove static import of `employees`
- Receive `employees` as prop from parent
- Update property names to match database schema:
  - `headshotPath` → `headshot_path`
  - `headshotPosition` → `headshot_position`
  - `modalInfo` → `modal_info`

---

## 4. Form Components

### Original Next.js Form
```jsx
// components/forms/contact/contact.js
import React from 'react';
import useInput from './useInput';
import Form from './form';

export default function Contact() {
  const { formState, bind } = useInput();

  return (
    <section className="forms__contact">
      <div className="forms__contact__container">
        <h2 className="forms__contact__container__lgtext">Contact Us</h2>
        <Form formState={formState} bind={bind} />
      </div>
    </section>
  );
}
```

### Migrated Inertia.js Form
```jsx
// resources/js/Components/forms/contact/Contact.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import Form from './Form';

export default function Contact() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/contact');
  };

  return (
    <section className="forms__contact">
      <div className="forms__contact__container">
        <h2 className="forms__contact__container__lgtext">Contact Us</h2>
        <Form 
          data={data} 
          setData={setData} 
          processing={processing} 
          errors={errors}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
```

**Key Changes:**
- Replace `useInput` hook with Inertia's `useForm`
- Add form submission handling
- Pass form state and errors to child components

---

## 5. Layout Components

### Original Next.js Layout
```jsx
// layouts/default.js
import React from 'react';
import Meta from './meta';
import Navbar from '../components/nav/navbar';
import Footer from '../components/footer';

export default ({ children, meta }) => (
  <>
    <Meta {...meta} />
    <header>
      <Navbar />
    </header>
    <main>
      {children}
    </main>
    <Footer />
  </>
);
```

### Migrated Inertia.js Layout
```jsx
// resources/js/Layouts/Default.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import Meta from './Meta';
import Navbar from '../Components/nav/Navbar';
import Footer from '../Components/Footer';

export default function Default({ children, meta }) {
  return (
    <>
      <Head>
        <title>{meta?.title ? `${meta.title} | Be Well Therapy, PLLC` : 'Be Well Therapy, PLLC'}</title>
        <meta name="description" content={meta?.description || 'The home of Be Well Therapy, PLLC'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/img/favicon.png" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
```

**Key Changes:**
- Replace `Meta` component with Inertia's `Head`
- Update import paths
- Add proper function declaration

---

## 6. Hook Migration

### Original Custom Hook
```jsx
// components/useResize.js
import { useState, useEffect } from 'react';

export default function useResize(breakpoint) {
  const [mobile, setMobile] = useState(false);

  const resizeFunc = () => {
    setMobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    resizeFunc();
    window.addEventListener('resize', resizeFunc);
    return () => {
      window.removeEventListener('resize', resizeFunc);
    };
  }, []);

  return { mobile, resizeFunc };
}
```

### Migrated Hook (No Changes Needed)
```jsx
// resources/js/Hooks/useResize.js
import { useState, useEffect } from 'react';

export default function useResize(breakpoint) {
  const [mobile, setMobile] = useState(false);

  const resizeFunc = () => {
    setMobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    resizeFunc();
    window.addEventListener('resize', resizeFunc);
    return () => {
      window.removeEventListener('resize', resizeFunc);
    };
  }, []);

  return { mobile, resizeFunc };
}
```

**Key Changes:**
- None! Custom hooks work exactly the same
- Just update import paths

---

## 7. Constants Migration

### Original Constants
```jsx
// components/constants.js
export const services = [
  {
    header: 'Kids',
    shortName: 'child',
    // ... more data
  }
];

export const hours = [
  {
    day: 'Monday',
    abbr: 'Mon',
    start: '9:00 AM',
    end: '8:00 PM',
  }
];
```

### Migrated Constants (Static Data)
```jsx
// resources/js/constants.js
export const hours = [
  {
    day: 'Monday',
    abbr: 'Mon',
    start: '9:00 AM',
    end: '8:00 PM',
  }
];

export const address = '1935 J N Pease Place, Ste. 202';
export const city = 'Charlotte, NC 28262';
export const fullAddress = '1935 J N Pease Place Ste. 202 Charlotte, NC';
export const email = 'tcrouch@bewelltherapy.org';
export const phoneNum = '704.334.3170';
export const googleMapsLink = 'https://www.google.com/maps/dir//1935+J+N+Pease+Pl+STE+202,+Charlotte,+NC+28262/@35.3203164,-80.8080769,13z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88541dc9a49fc7e9:0xdee81c33e1af9574!2m2!1d-80.7730575!2d35.3202514!3e0';
```

**Key Changes:**
- Remove `services` array (now comes from database)
- Keep static data like hours, contact info
- Update import paths

---

## 8. File Naming Conventions

### Before (Next.js)
```
components/
├── nav/
│   ├── desktopNavbar.js
│   ├── mobileNavbar.js
│   └── navbar.js
├── ourStaff/
│   ├── employeeCards/
│   │   ├── employeeCards.js
│   │   └── employeeCard.js
│   └── staffInfo.js
└── forms/
    ├── contact/
    │   ├── contact.js
    │   ├── form.js
    │   └── useInput.js
    └── header/
        └── header.js
```

### After (Inertia.js)
```
resources/js/Components/
├── nav/
│   ├── DesktopNavbar.jsx
│   ├── MobileNavbar.jsx
│   └── Navbar.jsx
├── ourStaff/
│   ├── employeeCards/
│   │   ├── EmployeeCards.jsx
│   │   └── EmployeeCard.jsx
│   └── staffInfo.js (removed - now database)
└── forms/
    ├── contact/
    │   ├── Contact.jsx
    │   ├── Form.jsx
    │   └── useInput.js
    └── header/
        └── Header.jsx
```

**Key Changes:**
- PascalCase for component files
- `.jsx` extension for React components
- Keep `.js` for utilities and hooks

---

## 9. Import Path Updates

### Before
```jsx
import Header from '../../components/header';
import EmployeeCards from '../../components/ourStaff/employeeCards/employeeCards';
import { employees } from '../../components/ourStaff/staffInfo';
```

### After
```jsx
import Header from '../Components/Header';
import EmployeeCards from '../Components/ourStaff/employeeCards/EmployeeCards';
// employees now comes from props, not import
```

---

## 10. Common Migration Patterns

### Pattern 1: Static Data → Props
```jsx
// Before
import { employees } from '../staffInfo';
const cards = employees.map(...);

// After
export default function Component({ employees }) {
  const cards = employees.map(...);
}
```

### Pattern 2: Next.js Link → Inertia Link
```jsx
// Before
import Link from 'next/link';
<Link href="/about-us">About Us</Link>

// After
import { Link } from '@inertiajs/react';
<Link href="/about-us">About Us</Link>
```

### Pattern 3: Form Handling
```jsx
// Before
const { formState, bind } = useInput();
const form = new Form(formState);

// After
const { data, setData, post, processing, errors } = useForm({
  name: '',
  email: '',
  // ...
});
```

### Pattern 4: Meta Tags
```jsx
// Before
import Meta from './meta';
<Meta {...meta} />

// After
import { Head } from '@inertiajs/react';
<Head title="Page Title" />
```

---

## Migration Checklist

- [ ] Update all import paths
- [ ] Convert `next/link` to `@inertiajs/react` Link
- [ ] Replace static data imports with props
- [ ] Update form handling to use Inertia's `useForm`
- [ ] Replace `Meta` component with `Head`
- [ ] Update file extensions to `.jsx`
- [ ] Use PascalCase for component files
- [ ] Test all components after migration
- [ ] Verify all routes work correctly
- [ ] Check that all styling is preserved

This guide covers the most common migration patterns. Most of your existing React components will work with minimal changes when migrating to Inertia.js! 
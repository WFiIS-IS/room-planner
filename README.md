This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

The application is hosted at [room-planer app](https://room-planner.critteros.dev/)!

![](./docs/main_page.png)

From main page you are able to access all your devices,
for example lights
![](./docs/all_devices.png)

By pressing on desired element you are able to toggle it's function (turn on/turn off light).
All elements are integrated with Home Assistant platform,
so their state is taken from HA and all changes applied to them are also visible in HA interface.

![](./docs/devices_view.png)

From main page you can also access page with all scenes:
![](./docs/scene_view.png)

To define a new scene upload your own image and give the scene a name:
![](./docs/create_scene.png)

After scene creation, access the scence and place elements in desired room.
You can also toogle function of each element from scene view by pressing on it's icon.

![](./docs/move_elements.png)

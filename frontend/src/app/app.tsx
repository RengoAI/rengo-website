import { appRouter } from "@/app/app-router";
import { Provider } from "@/components/ui/provider";
import { RouterProvider } from "react-router-dom";

export const App = () => (
  <Provider>
    <RouterProvider router={appRouter} />
  </Provider>
);

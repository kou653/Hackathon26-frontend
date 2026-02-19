import SuccessRegistration from "../screens/auth/registration/SuccessRegistration.jsx";
import PreselectionView from "../screens/views/participant/PreselectionView.jsx";
import Restauration from "../screens/views/participant/Restauration.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SettingsView from "../screens/views/settings/SettingsView.jsx";
import SignInView from "../screens/auth/registration/SignInView.jsx";
import RestaurantView from "../screens/views/RestaurantView.jsx";
import CountView from "../screens/views/rules/CountView.jsx";
import RulesView from "../screens/views/rules/RulesView.jsx";
import LogInView from "../screens/auth/login/LogInView.tsx";
import GameCountView from "../screens/quizGame/count.jsx";
import PannelView from "../screens/pannel/PannelView.jsx";
import AdminSpace from "../screens/views/AdminSpace.jsx";
import EndQuiz from "../screens/views/quiz/EndQuiz.jsx";
import QuizGame from "../screens/quizGame/QuizGame.jsx";
import PrintView from "../screens/views/PrintView.tsx";
import TeamsView from "../screens/views/TeamsView.jsx";
import RankView from "../screens/views/RankView.jsx";
import AuthView from "../screens/auth/AuthView.jsx";
import { GuardedRoute } from "../guard/guard.jsx";
import "react-toastify/dist/ReactToastify.css";
import Page404 from "../screens/404/Page404.js";
import NavBar from "../components/NavBar.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";

import Quiz from "../screens/views/quiz/QuizView.jsx";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <AuthView />
          <Toaster />
        </>
      ),
    },
    {
      children: [
        {
          path: "*",
          element: (
            <>
              <Page404 />
            </>
          ),
        },
        {
          path: "hackathon/administration/UsersScreen",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={AdminSpace}
                allowedRoles={["admin", "participant"]}
              />
              <Toaster />
            </>
          ),
        },
        // {
        //   path: "hackathon/registration/SuccessRegistration",
        //   element: (
        //     <>
        //       <NavBar />
        //       <GuardedRoute
        //         required={true}
        //         component={SuccessRegistration}
        //         allowedRoles={["admin", "participant"]}
        //       />
        //       <Toaster />
        //     </>
        //   ),
        // },

        // {
        //   path: "hackathon/registration/SignInView",
        //   element: (
        //     <>
        //       <NavBar />
        //       <GuardedRoute
        //         required={true}
        //         component={SignInView}
        //         allowedRoles={["admin", "participant"]}
        //       />
        //       <Toaster />
        //     </>
        //   ),
        // },

        {
          path: "hackathon/administration/PreselectionView",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={PreselectionView}
                allowedRoles={["participant"]}
              />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/administration/Restauration-for-participant",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={Restauration}
                allowedRoles={["participant"]}
              />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/administration/SettingsView",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={SettingsView}
                allowedRoles={["admin"]}
              />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/administration/TeamsView",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={TeamsView}
                allowedRoles={["admin"]}
              />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/administration/PrintView",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={PrintView}
                allowedRoles={["admin"]}
              />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/administration/RestaurantView",
          element: (
            <>
              <Toaster />
              <NavBar />
              <GuardedRoute
                required={true}
                component={RestaurantView}
                allowedRoles={["admin"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/administration/Quiz",
          element: (
            <>
              <Toaster />
              <GuardedRoute
                required={true}
                component={Quiz}
                allowedRoles={["participant"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/administration/EndQuiz",
          element: (
            <>
              <Toaster />
              <GuardedRoute
                required={true}
                component={EndQuiz}
                allowedRoles={["participant"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/administration/Rules",
          element: (
            <>
              <Toaster />
              <NavBar />
              <GuardedRoute
                required={true}
                component={RulesView}
                allowedRoles={["participant"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/administration/Count",
          element: (
            <>
              <GuardedRoute
                required={true}
                component={CountView}
                allowedRoles={["participant"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/teaser/pannel",
          element: (
            <>
              <GuardedRoute
                required={false}
                component={PannelView}
                allowedRoles={["participant"]}
              />
            </>
          ),
        },
        {
          path: "hackathon/game/rank",
          element: (
            <>
              <NavBar />
              <GuardedRoute
                required={true}
                component={RankView}
                allowedRoles={["admin"]}
              />
              <Toaster />
            </>
          ),
        },
      ],
    },
    {
      children: [
        {
          path: "hackathon/game/GameCountView",
          element: (
            <>
              <GameCountView />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/auth/AuthView",
          element: (
            <>
              <AuthView />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/sdi/QuizGame",
          element: (
            <>
              <QuizGame />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/auth/LogInView",
          element: (
            <>
              <LogInView />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/auth/SignInView",
          element: (
            <>
              <SignInView />
              <Toaster />
            </>
          ),
        },
        {
          path: "hackathon/auth/SuccessRegistration",
          element: (
            <>
              <SuccessRegistration />
              <Toaster />
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

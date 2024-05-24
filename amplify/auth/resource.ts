import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      // ...
      callbackUrls: ["http://localhost:3000/login"],
      logoutUrls: ["http://localhost:3000/logout"],
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
    fullname: {
      mutable: true,
      required: false,
    },
    gender: {
      mutable: true,
      required: false,
    },
    profilePicture: {
      mutable: true,
      required: false,
    },
  },
});

import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "myProjectFiles",
  access: (allow) => ({
    "media/*": [allow.authenticated.to(["read", "write", "delete"])],
    "media/profile-pictures/*": [allow.guest.to(["read"])],
    "other/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
    // "media/profile-pictures/{entity_id}/*": [
    //   allow.entity("identity").to(["read", "write", "delete"]),
    //   allow.guest.to(["read"]),
    //   allow.authenticated.to(["read"]),
    // ],
  }),
});

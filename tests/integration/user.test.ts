import { describe, expect, it } from "vitest";
import axios from "axios";
import { User } from "../../backend/src/models/user.model";

const BACKEND_USER_URL = "http://localhost:3000/api/v1/user";

describe("User Routes /api/v1/user", () => {
  describe("/register: Used to Register a New User", () => {
    it("register-1: if all fields not given, say password is missing", async () => {
      try {
        await axios.post(`${BACKEND_USER_URL}/register`, {
          fullName: "anish",
          email: "a@a.com",
          username: "anishs1207",
        });

        throw new Error("Request should have failed but did not");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toEqual({
          success: false,
          message: "some fields are missing",
          errors: [],
          data: null,
        });
      }
    });

    it("register-2: if user already exists and not auth user ", async () => {
      // create user
      // tests
      // delete the user
    });

    it("register-3: if user exists & is an Google OAuth User", async () => {});

    it("register-4: if user is an admin", async () => {});

    it("register-5: User is registered, Email is verified, access & refresh tokens stored", async () => {});
  });

  describe("/login: Used to Login a User", () => {
    it("login-1: all required fields are not passed (email & password)", async () => {});

    it("login-2: if user with email does not exist", async () => {});

    it("login-3: if user exists but is not verified", async () => {});

    it("login-4: if user exists, verified, but password is not valid", async () => {});

    it("login-5: Successful Login - if user exists, verified, password is valid", async () => {});
  });

  describe("/logout: Used to Logout a User", () => {
    it("logout-1: verifyJWT - no accessToken cookie passed", () => {});

    it("logout-2: verifyJWT - accessToken passed but User not found", () => {});

    it("logout-3: verifyJWT - accessToken passed, User found, but not verified", () => {});

    it("logout-4: verifyJWT works & User logged out successfully", () => {});
  });

  // @@@for all these cookies must be present
  // verifyJWT must work for it

  describe("/refresh-token: Used to Refresh an Access Token", () => {
    it("refresh-access-token-1:  no incoming refresh token", async () => {});

    it("refresh-access-token-2: invalid refresh token", async () => {});

    it("refresh-access-token-3: refresh token is expired or used", async () => {});

    it("refresh-access-token4: Access token is refreshed successfully", async () => {});
  });

  describe("/verify: Used to verify an Email", () => {
    it("verify-1: required fields are not passed", async () => {});

    it("verify-2: User with email not found", async () => {});

    it("verify-3: User with email already verified", async () => {});

    it("verify-4: Verification code does not match", async () => {});

    it("verify-5: Verification code has expired", async () => {});

    it("verify-6: User is verified successfully", async () => {});
  });

  describe("/session: Used to fetch the current user session", () => {
    it("session-1: User is not authenticated ", async () => {});

    it("session-2: User is not found in DB", async () => {});

    it("session-3: User Session fetched successfully", async () => {});
  });

  describe("/resend-code: Used to resend the Verification Code", () => {
    it("resend-code-1: email is not given", async () => {});
    it("resend-code-2: user with given email is not found", async () => {});
    it("resend-code-3: user with given email is already verified", async () => {});
    it("resend-code-4: Resend code is sent successfully", async () => {});
  });

  describe("/get-notifications: Get All User's Notifications", () => {
    it("get-notifications-1: User Id is not passed", async () => {});
    it("get-notifications-2: User with given Id is not found", async () => {});
    it("get-notifications-3: User Notifications fetched Successfully", async () => {});
  });

  describe("/delete-notifications: Deletes All User's Notifications", () => {
    it("delete-notifications-1: User Id is not passed", async () => {});
    it("delete-notifications-2: User with given Id is not found", async () => {});
    it("delete-notifications-3: User Notifications Deleted successfully", async () => {});
  });

  describe("/subscribe: User subscribed to Newsletter", () => {
    it("subscribe-1: Email not passed", async () => {});
    it("subscribe-2: User with given Email is not found", async () => {});
    it("subscribe-3: User is subscribed to Newsletter successfully", async () => {});
  });

  describe("/check-subscribe: Check if User's subscribed or not", () => {
    it("check-subscribe-1: Email is not passed", async () => {});
    it("check-subscribe-2: User with passed email does not exist", async () => {});
    it("check-subscribe-3: Subscription Status of User is checked successfully", async () => {});
  });
});

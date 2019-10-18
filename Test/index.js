import { describe } from "mocha";
import signup from "./signup.test";
import signin from "./signin.test"
import Articles from "./ariticle.test"


describe("App guidelines", () => {
    describe("User Sign-up", signup);
    describe("User Sign-in",signin);
    describe("Articles", Articles);
});

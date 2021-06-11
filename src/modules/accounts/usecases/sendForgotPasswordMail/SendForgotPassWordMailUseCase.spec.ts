import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inmemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateprovider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailprovider/inmemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPassWordMailUseCase } from "./SendForgotPassWordMailUseCase";

let sendForgotPassWordMailUseCase: SendForgotPassWordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password Recovery Email", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPassWordMailUseCase = new SendForgotPassWordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password recovery email.", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.createUser({
      name: "Test Name",
      email: "test@test.com",
      password: "123123",
      driver_license: "123456",
    });

    await sendForgotPassWordMailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send recovery password email to a nonexistent user.", async () => {
    await expect(
      sendForgotPassWordMailUseCase.execute("test2@test2.com")
    ).rejects.toEqual(new AppError("User does not exists."));
  });

  it("Should be able to create an user token", async () => {
    const generateTokenEmail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.createUser({
      name: "Test Name 3",
      email: "test3@test3.com",
      password: "123123",
      driver_license: "12345678",
    });

    await sendForgotPassWordMailUseCase.execute("test3@test3.com");

    expect(generateTokenEmail).toHaveBeenCalled();
  });
});

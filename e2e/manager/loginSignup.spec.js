describe('login signup', () => {
  before(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  beforeEach(async() => {
      await device.reloadReactNative();
  });

    // UI check
    it('check UI elements exist', async () =>{
        // Test tapping sign up button and navigate to sign up screen
        await element(by.id('signUpButton')).tap();
        // Check that text input elements exist
        await expect(element(by.id('signUpFullNameTextInput'))).toExist();
        await expect(element(by.id('signUpUSCIDTextInput'))).toExist();
        await expect(element(by.id('signUpUSCEmailTextInput'))).toExist();
        await expect(element(by.id('signUpStudentRadioButton'))).toExist();
        await expect(element(by.id('signUpPasswordTextInput'))).toExist();
    });


    //Sign Up

    it('sign up with empty fields shows alert', async () => {
        // Test tapping sign up button and navigate to sign up screen
        await element(by.id('signUpButton')).tap();
        // missing text inputs, expects alert to show
        await element(by.id("signUpScrollView")).scroll(300, 'down');
        await element(by.id("signUpDoneButton")).tap();
        await element(by.text("OK")).tap();
    });

    it('student sign up with no major selected', async () => {
      // Test tapping sign up button and navigate to sign up screen
        await element(by.id('signUpButton')).tap();
      // Test text input for student account
      await element(by.id("signUpFullNameTextInput")).typeText("SignUpDelete");
      await device.pressBack();
     // await element(by.id("signUpUSCIDTextInput")).typeText("1234567890");
      //await device.pressBack();
      await element(by.id("signUpUSCEmailTextInput")).typeText("signupdelete@usc.edu");
      await device.pressBack();
      await element(by.id('signUpStudentRadioButton')).tap();
      await element(by.id('signUpStudentRadioButton')).tap();
      await element(by.id('signUpStudentRadioButton')).tap();
      //await waitFor(element(by.id("signUpStudentRadioButtonIcon"))).toHaveValue()
      await element(by.id("signUpPasswordTextInput")).typeText("1");
      await device.pressBack();

      // missing selection for major, expects alert to show up
      await element(by.id("signUpDoneButton")).tap();
      await element(by.id("signUpDoneButton")).tap();
      await element(by.text("OK")).tap();

    });

    it('manager sign up with no email provided', async () =>{
      // Test tapping sign up button and navigate to sign up screen
      await element(by.id('signUpButton')).tap();
      // Enter fullname, uscID, but no email
      await element(by.id('signUpFullNameTextInput')).typeText("managerSignUpTest");
      await device.pressBack();
      await element(by.id("signUpScrollView")).scroll(200, 'down');
      await element(by.id("signUpDoneButton")).tap();
        await element(by.id("signUpDoneButton")).tap();
      await expect(element(by.text("manager must enter email, password, and full name"))).toExist();
      await element(by.text("OK")).tap(); // alert shows
    });

    it('correct manager signup', async () =>{
      //await device.reloadReactNative();
      // Test tapping sign up button and navigate to sign up screen
      await element(by.id('signUpButton')).tap();
      // Enter fullname, uscID, but no email
      await element(by.id('signUpFullNameTextInput')).typeText("managerCorrectSignUp1");
      await device.pressBack();
      await element(by.id("signUpUSCIDTextInput")).typeText("1");
      await device.pressBack();
      await element(by.id("signUpUSCEmailTextInput")).typeText("manager111@usc.edu");
      await device.pressBack();
      await element(by.id("signUpPasswordTextInput")).typeText("1");
      await device.pressBack();
      await element(by.id("signUpDoneButton")).tap();

    });

    it('correct student signup', async () =>{
        // Test tapping sign up button and navigate to sign up screen
        await element(by.id('signUpButton')).tap();
        //Test text input for student account
        await element(by.id("signUpFullNameTextInput")).typeText("studentCorrectSignUp1");
        await device.pressBack();
        await element(by.id("signUpUSCIDTextInput")).typeText("1");
        await device.pressBack();
        await element(by.text("Plase Select a School")).tap();
        await element(by.text("Plase Select a School")).tap();
        await element(by.text("USC School of Architecture")).tap();
        await element(by.id("signUpUSCEmailTextInput")).typeText("student112@usc.edu");
        await device.pressBack();
        await element(by.id("signUpPasswordTextInput")).typeText("1");
        await device.pressBack();
        await element(by.id('signUpStudentRadioButton')).tap();
        await element(by.id('signUpStudentRadioButton')).tap();
        await element(by.id('signUpDoneButton')).tap();
        await element(by.text("OK")).tap();
    });

    //Login

    it('empty input alert for login', async () => {
        // Test Login button and expect alert for empty inputs
        await element(by.id('loginButton')).tap();
        await element(by.text("OK")).tap();

    });

    it('password missing for login', async () => {
        await element(by.id("loginEmail")).typeText("student111@usc.edu");
        await device.pressBack()
        await element(by.id('loginButton')).tap();
        await element(by.text("OK")).tap();

    });

    it('email missing for login', async () => {
        await element(by.id("loginPassword")).typeText("1");
        await device.pressBack()
        await element(by.id('loginButton')).tap();
        await element(by.text("OK")).tap();

    });

    it('correct login using student', async () => {
        await element(by.id("loginEmail")).typeText("student112@usc.edu");
        await device.pressBack()
        await element(by.id("loginPassword")).typeText("1");
        await device.pressBack()
        await element(by.id('loginButton')).tap();
        await expect(element(by.text("OK"))).toBeNotVisible();
    });

    it('correct login using manager', async () => {
        await element(by.id("loginEmail")).typeText("manager111@usc.edu");
        await device.pressBack()
        await element(by.id("loginPassword")).typeText("1");
        await device.pressBack()
        await element(by.id('loginButton')).tap();
        await expect(element(by.text("OK"))).toBeNotVisible();
    });





});

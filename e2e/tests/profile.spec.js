describe('Profile', () => {
  before(async () => {
    await setup();
    await element(by.id('Profile')).tap();
  });

  it('should show login screen after clicking yes for log out pop-up ', async () => {
    await element(by.id('log-out-outline')).tap();
    await element(by.id('Yes')).tap();
    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  it('should show profile after clicking no for log out pop-up', async () => {
    await element(by.id('loginButton')).tap();
    await element(by.id('Profile')).tap(); // "Profile" refers to the profile tab
    await element(by.id('log-out-outline')).tap();
    await element(by.id('No')).tap();
    await expect(element(by.id('Profile1'))).toBeVisible(); // "Profile1" refers to the profile screen
  });

  it('should show log in screen after clicking yes for delete account pop-up', async () => {
    await setupRegister();
    await element(by.id('Profile')).tap();
    await element(by.id('close-outline')).tap();
    await element(by.id('Yes')).tap();
    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  it('should show Camera after clicking update photo', async () => {
    await setup();
    await element(by.id('Profile')).tap();
    await element(by.id('camera-outline')).tap();
    await expect(element(by.id('Camera'))).toBeVisible();
  });

  it('should update profile picture after clicking snap', async () => {
    await element(by.id('snap')).tap();
    await expect(element(by.id('profileImage'))).toBeVisible();
  });

  // Change password Series
  it('should show change password screen after clicking change password', async () => {
    await setup();
    await element(by.id('Profile')).tap();
    await element(by.id('key-outline')).tap();
    await expect(element(by.id('ChangePassword'))).toBeVisible();
  });

  it('should go back to profile after clicking cancel in change password screen', async () => {
    await element(by.id('currentPassword')).typeText('1');
    await element(by.id('newPassword')).typeText('2');
    await element(by.id('comfirmNewPassword')).typeText('2');
    await element(by.id('changePasswordCancel')).tap();
    await expect(element(by.id('Profile1'))).toBeVisible();
  });

  it('should show error after entering wrong original password', async () => {
    await element(by.id('key-outline')).tap();
    await element(by.id('currentPassword')).typeText('3');
    await element(by.id('newPassword')).typeText('2');
    await element(by.id('comfirmNewPassword')).typeText('2');
    await element(by.id('changePasswordDone')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('ChangePassword'))).toBeVisible();
  });

  it('should show error after entering empty input', async () => {
    await element(by.id('currentPassword')).clearText();
    await element(by.id('newPassword')).clearText();
    await element(by.id('newPassword')).typeText('2');
    await element(by.id('comfirmNewPassword')).clearText();
    await element(by.id('comfirmNewPassword')).typeText('2');
    await element(by.id('changePasswordDone')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('ChangePassword'))).toBeVisible();
  });

  it('should show error after entering un-matched new password and confirm new password', async () => {
    await element(by.id('currentPassword')).typeText('1');
    await element(by.id('newPassword')).clearText();
    await element(by.id('newPassword')).typeText('2');
    await element(by.id('comfirmNewPassword')).clearText();
    await element(by.id('comfirmNewPassword')).typeText('3');
    await element(by.id('changePasswordDone')).tap();
    await element(by.text('OK')).tap();
    await expect(element(by.id('ChangePassword'))).toBeVisible();
  });
});
async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('admin@usc.edu');
  await element(by.id('loginPassword')).typeText('1');
  await element(by.id('loginButton')).tap();
}

async function setupRegister() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('signUpButton')).tap();
  // Enter fullname, uscID, but no email
  await element(by.id('signUpFullNameTextInput')).typeText('manager');
  await device.pressBack();
  await element(by.id('signUpUSCIDTextInput')).typeText('testingID1');
  await device.pressBack();
  await element(by.id('signUpUSCEmailTextInput')).typeText('manager1@usc.edu');
  await device.pressBack();
  await element(by.id('signUpPasswordTextInput')).typeText('1');
  await device.pressBack();
  await element(by.id('signUpManagerRadioButton')).tap();
  await element(by.id('signUpDoneButton')).tap();
  await element(by.id('Profile')).tap();
}

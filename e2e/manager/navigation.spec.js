describe('Manager Navigation', () => {

  before(async () => {
    await setup();
  });


  it('show home tab', async () => {
    await element(by.id('Home')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
  });

  it('show location search tab', async () => {
    await element(by.id('LocationSearch')).tap();
    await expect(element(by.id('LocationSearch1'))).toBeVisible();
  });

  it('show visit history tab', async () => {
    await element(by.id('VisitHistory')).tap();
    await expect(element(by.id('VisitHistory1'))).toBeVisible();
  });

  it('show profile tab', async () => {
    await element(by.id('Profile')).tap();
    await expect(element(by.id('Profile1'))).toBeVisible();
  });


  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  // it('should /login screen', async () => {
  //   await expect(element(by.id('password'))).toBeVisible();
  // });

  // it('should have welcome screen', async () => {
  //   // await expect(element(by.id('password'))).toBeVisible();
  // });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('manager@usc.edu');
  await element(by.id('loginPassword')).typeText('2');
  await element(by.id('loginButton')).tap();
}
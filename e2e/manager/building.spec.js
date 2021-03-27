describe('Manager Building Screen', () => {
  before(async () => {
    await setup();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('should /login screen', async () => {
    // await expect(element(by.id('password'))).toBeVisible();
  });

  it('should have welcome screen', async () => {
    // await expect(element(by.id('password'))).toBeVisible();
  });
});

async function setup() {
  await device.launchApp();
  await element(by.id('loginEmail')).typeText('huan773@usc.edu');
  await element(by.id('loginPassword')).typeText('1');
  await element(by.id('loginButton')).tap();
}
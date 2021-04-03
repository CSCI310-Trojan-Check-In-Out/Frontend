describe('Navigation', () => {
  before(async () => {
    await setup();
  });

  it('should show home tab', async () => {
    await element(by.id('Home')).tap();
    await expect(element(by.id('Home'))).toBeVisible();
  });

  it('should show location search tab', async () => {
    await element(by.id('LocationSearch')).tap();
    await expect(element(by.id('LocationSearch1'))).toBeVisible();
  });

  it('should show visit history tab', async () => {
    await element(by.id('VisitHistory')).tap();
    await expect(element(by.id('VisitHistory1'))).toBeVisible();
  });

  it('should show profile tab', async () => {
    await element(by.id('Profile')).tap();
    await expect(element(by.id('Profile1'))).toBeVisible();
  });
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('admin@usc.edu');
  await element(by.id('loginPassword')).typeText('1');
  await element(by.id('loginButton')).tap();
}

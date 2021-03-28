describe('Manager Profile', () => {
  before(async () => {
    await setup();
  });

  it('should show some results after searching', async () => {});

  it('should show time after tapping time filter', async () => {});
  
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('huan773@usc.edu');
  await element(by.id('loginPassword')).typeText('2');
  await element(by.id('loginButton')).tap();
  await element(by.id('VisitHistory')).tap();
}

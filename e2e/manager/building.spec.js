describe('Manager Building Screen', () => {
  before(async () => {
    await setup();
  });

  it('should show visit history screen', async () => {
    
  });

  it('should have welcome screen', async () => {

  });
});

async function setup() {
  await device.launchApp();
  await device.reloadReactNative();
  await element(by.id('loginEmail')).typeText('manager@usc.edu');
  await element(by.id('loginPassword')).typeText('2');
  await element(by.id('loginButton')).tap();
  await element(by.id('VisitHistory')).tap();
}
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  }
  catch (Exception error) {
    logError(e);
  }
}

private void deletePageAndAllReferences(Page oage) throws Exception {
  deletePage(page);
  registry.deleteRefrence(page.name);
  configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) {
  logger.log(e.getMessgae());
}
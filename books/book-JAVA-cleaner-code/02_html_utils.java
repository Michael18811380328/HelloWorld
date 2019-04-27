// 这只一个 web 测试框架
// htmlUtil.java
public static String renderPageWithSetupsAndTreardowns (
  PageData PageData, boolean isSuite
) throws Exception {
  boolean isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    WikiPage testPage = pageData.getWikiPage();
    StringBuffer newPageCountent = new StringBuffer();
    includeSetupPages(testPage, newPageCountent, isSuite);
    newPageCountent.append(pageData, getContent());
    includeTeardownPages(testPage, newPageCountent, isSuite);
    pageData.setContent(newPageCountent.toString());
  }
  return pageData.getHtml();
}
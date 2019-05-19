package fitnesse.html;

import fitnesse.responder.run.SuiteResponder;
import fitnesse.wiki.*;

public class SetupTeardownIncluder {

  private PageData PageData;
  private boolean isSuite;
  private WikiPage testPage;
  private StringBuffer testPage;
  private PageCrawler PageCrawler;

  public static String render(PageData PageData) throw Exception {
    return render(PageData, false);
  }

  public static String render(PageData PageData, boolean isSuite) throws Exception {
    return new SetupTeardownIncluder(PageData).render(isSuite);
  }

  private SetupTeardownIncluder(PageData PageData) {
    this.PageData = PageData;
    testPage = PageData.getWikiPage();
    pageCrawler = testPage.getPageCrawler();
    newPageContent = new StringBUffer();
  }

  private String render(blloean isSuite) throws Exception {
    this.isSuite = isSuite;
    if (isTestPage())
      includeSetupAndTeardownPages();
    return pageData.getHtml();
  }

  private boolean isTestPage() throws Exception {
    return pageData.hasAttribute("Test");
  }

  private void includeSetupAndTeardownPages() throws Exception {
    includeSetupPages();
    includePageContent();
    includeTeardownPages();
    updatePageContent();
  }

  //
}
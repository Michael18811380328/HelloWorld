public class GuessStaticsMessage {

  // 创建类变量
  private String number;
  private String verb;
  private String modifier;

  // 表示这个方法的返回值是字符串，如果是 void 表示返回值是空
  public String make(char candidate, int count) {
    createMessageParts(count);
    return String.firmat(
    );
  }

  // 根据不同的数量执行不同的函数
  private void createDependentMessageParts(int count) {
    if (count == 0) {
      thereAreNoLetters();
    } else if (count == 1) {
      thereIsOneLetter();
    } else {
      thereAreManyLetters(count);
    }
  }

  // 对应三种不同的处理逻辑，并没有放在上面一个函数内部
  private void thereAreManyLetters(int count) {
    number = Integer.toString(count);
    verb = 'are';
    modifier = 's';
  }

  private void thereIsOneLetter() {
    number = '1';
    verb = 'is';
    modifier = '';
  }

  private void thereAreNoLetters() {
    number = 'no';
    verb = 'are';
    modifier = 's';
  }
}
import ReactModal from 'react-modal';

<ReactModal
  // isOpen is necessary from props. important!
  isOpen={false}

  // similar to life-cycle function
  onAfterOpen={handleAfterOpenFunc}
  onRequestClose={handleRequestCloseFunc}
  // time(MS) before modal close 
  closeTimeoutMS={0}

  style={{ 
    overlay: {}, 
    content: {} 
  }}
  // screen reader for blind
  contentLabel="Example Modal"
  
  // different classes render styles
  portalClassName="ReactModalPortal"
  overlayClassName="ReactModal__Overlay"
  className="ReactModal__Content"
  bodyOpenClassName="ReactModal__Body--open"
  htmlOpenClassName="ReactModal__Html--open"
  /*
    Boolean indicating if the appElement should be hidden
  */
  ariaHideApp={true}
  /*
    Boolean indicating if the modal should be focused after render
  */
  shouldFocusAfterRender={true}
  /*
    Boolean indicating if the overlay should close the modal
  */
  shouldCloseOnOverlayClick={true}
  /*
    Boolean indicating if pressing the esc key should close the modal
    Note: By disabling the esc key from closing the modal you may introduce an accessibility issue.
  */
  shouldCloseOnEsc={true}
  /*
    Boolean indicating if the modal should restore focus to the element that
    had focus prior to its display.
  */
  shouldReturnFocusAfterClose={true}
  /*
    String indicating the role of the modal, allowing the 'dialog' role to be applied if desired.
  */
  role="dialog"
  /*
    Function that will be called to get the parent element that the modal will be attached to.
  */
  parentSelector={() => document.body}
  /*
    Additional aria attributes (optional).
  */
  aria={{
    labelledby: "heading",
    describedby: "full_description"
  }}
  /*
    Overlay ref callback.
  */
  overlayRef={setOverlayRef}
  /*
    Content ref callback.
  */
  contentRef={setContentRef}
/>
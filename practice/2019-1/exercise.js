// January 2019 editor

render() {
  const { relatedFiles, fileTagList } = this.props;
  const openDialogs = this.props.openDialogs;
  return (
    <div className="sf-md-viewer d-flex flex-column">
      <div className="sf-md-viewer-topbar">
        <div className="sf-md-viewer-topbar-fisrt d-flex justify-content-between">
          <FileInfo
            mode={this.props.mode}
            toggleStar={this.props.toggleStar}
            fileInfo={this.props.fileInfo}
            editorUtilities={this.props.editorUtilities}
          />
          {
            (this.props.hasDraft && !this.props.isDraft && this.props.reviewStatus !== 'open') &&
            <div className="sf-btn-view-review">
              <div className="tag tag-green">
                {this.props.t('test')}
                <a className="ml-2" onMouseDown={this.props.editorUtilities.goDraftPage}>{this.props.t('edit_draft')}</a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
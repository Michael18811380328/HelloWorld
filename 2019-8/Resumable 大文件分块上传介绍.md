# Resumable.js

可取出的；可回收的；

提供多个同时上传，稳定的可以撤销的文件上传（使用HTML的文件API）

It’s a JavaScript library providing multiple simultaneous, stable and resumable uploads via the HTML5 File API.

使用HTTP协议上传大文件：通过把一个文件分割成晓得chunks，如果上传一个chunk失败后，上传还会继续直到上传过程结束（传统过程中如果上传出现问题，服务器可能卡住）。当网络中途断开后（不管是本地还是服务器断开），这个库允许继续自动上传。除此之外，可以允许用户在上传过程中暂停或者继续上传任务。

The library is designed to introduce fault-tolerance into the upload of large files through HTTP. This is done by splitting each files into small chunks; whenever the upload of a chunk fails, uploading is retried until the procedure completes. This allows uploads to automatically resume uploading after a network connection is lost either locally or to the server. Additionally, it allows for users to pause, resume and even recover uploads without losing state.

这个库不依赖其他的库（只利用原生的File API）。这个依赖于一个文件可以分成很多小块。兼容性：支持FF 4 和 chrome 11以后的版本。

Resumable.js does not have any external dependencies other the `HTML5 File API`. This is relied on for the ability to chunk files into smaller pieces. Currently, this means that support is limited to Firefox 4+ and Chrome 11+.

下面是后端基于Flask的源码

~~~python
from flask import Flask, render_template, request, abort, jsonify
import os
app = Flask(__name__)
app.debug = True

temp_base = os.path.expanduser("~/tmp/flask_uploads/")

# landing page
@app.route("/resumable")
def resumable_example():
    return render_template("resumable_upload.html")

# resumable.js uses a GET request to check if it uploaded the file already.
# NOTE: your validation here needs to match whatever you do in the POST (otherwise it will NEVER find the files)
@app.route("/resumable_upload", methods=['GET'])
def resumable():
    resumableIdentfier = request.args.get('resumableIdentifier', type=str)
    resumableFilename = request.args.get('resumableFilename', type=str)
    resumableChunkNumber = request.args.get('resumableChunkNumber', type=int)

    if not resumableIdentfier or not resumableFilename or not resumableChunkNumber:
        # Parameters are missing or invalid
        abort(500, 'Parameter error')

    # chunk folder path based on the parameters
    temp_dir = os.path.join(temp_base, resumableIdentfier)

    # chunk path based on the parameters
    chunk_file = os.path.join(temp_dir, get_chunk_name(resumableFilename, resumableChunkNumber))
    app.logger.debug('Getting chunk: %s', chunk_file)

    if os.path.isfile(chunk_file):
        # Let resumable.js know this chunk already exists
        return 'OK'
    else:
        # Let resumable.js know this chunk does not exists and needs to be uploaded
        abort(404, 'Not found')


# if it didn't already upload, resumable.js sends the file here
@app.route("/resumable_upload", methods=['POST'])
def resumable_post():
    resumableTotalChunks = request.form.get('resumableTotalChunks', type=int)
    resumableChunkNumber = request.form.get('resumableChunkNumber', default=1, type=int)
    resumableFilename = request.form.get('resumableFilename', default='error', type=str)
    resumableIdentfier = request.form.get('resumableIdentifier', default='error', type=str)

    # get the chunk data
    chunk_data = request.files['file']

    # make our temp directory
    temp_dir = os.path.join(temp_base, resumableIdentfier)
    if not os.path.isdir(temp_dir):
        os.makedirs(temp_dir, 0777)

    # save the chunk data
    chunk_name = get_chunk_name(resumableFilename, resumableChunkNumber)
    chunk_file = os.path.join(temp_dir, chunk_name)
    chunk_data.save(chunk_file)
    app.logger.debug('Saved chunk: %s', chunk_file)

    # check if the upload is complete
    chunk_paths = [os.path.join(temp_dir, get_chunk_name(resumableFilename, x)) for x in range(1, resumableTotalChunks+1)]
    upload_complete = all([os.path.exists(p) for p in chunk_paths])

    # combine all the chunks to create the final file
    if upload_complete:
        target_file_name = os.path.join(temp_base, resumableFilename)
        with open(target_file_name, "ab") as target_file:
            for p in chunk_paths:
                stored_chunk_file_name = p
                stored_chunk_file = open(stored_chunk_file_name, 'rb')
                target_file.write(stored_chunk_file.read())
                stored_chunk_file.close()
                os.unlink(stored_chunk_file_name)
        target_file.close()
        os.rmdir(temp_dir)
        app.logger.debug('File saved to: %s', target_file_name)

    return 'OK'


def get_chunk_name(uploaded_filename, chunk_number):
    return uploaded_filename + "_part_%03d" % chunk_number
~~~

下面是前端基于JQ的代码

~~~html
<div class="resumable-drop">
  Drop video files here to upload or <a class="resumable-browse"><u>select from your computer</u></a>
</div>

<div class="progress" style="display:none;">
  <table>
    <tr>
      <td width="100%"><div class="progress-container"><div class="progress-bar"></div></div></td>
      <td class="progress-text" nowrap="nowrap"></td>
      <td class="progress-pause" nowrap="nowrap">
        <a href="#" onclick="uploader.resumable.upload(); return(false);" class="progress-resume-link"><img src="/resources/um/graphics/uploader/resume.png" title="Resume upload" /></a>
        <a href="#" onclick="uploader.resumable.pause(); return(false);" class="progress-pause-link"><img src="/resources/um/graphics/uploader/pause.png" title="Pause upload" /></a>
      </td>
    </tr>
  </table>
</div>

<div class="uploader-list" style="display:none;">
  <div class="uploader-item">
    ... (generated thumbnails for each file)
  </div>
</div>

<div class="file-edit-container" style="display:none;">
  ... (elements for the edit UI)
</div>

<script src="/resources/um/script/resumable.js"></script>
<script src="/resources/um/script/resumable-uploader.js"></script>
<script>
  uploader = (function($){
      var upload_token = '<api upload token>';
      var meta = {};
      return (new ResumableUploader(upload_token, meta, $('.resumable-browse'), $('.resumable-drop'), $('.progress'), $('.uploader-list'), $('.file-edit-container')));
    })(jQuery);
</script>
~~~

# How can I use it?

A new `Resumable` object is created with information of what and where to post:

首先，创建一个 Resumable 的实例（包括请求的内容和请求的地址）

```js
var r = new Resumable({
  target:'/api/photo/redeem-upload-token', 
  query:{upload_token:'my_token'}
});
// Resumable.js isn't supported, fall back on a different method
if(!r.support) location.href = '/some-old-crappy-uploader';
```

To allow files to be either selected and drag-dropped, you’ll assign drop target and a DOM item to be clicked for browsing:

```js
r.assignBrowse(document.getElementById('browseButton'));
r.assignDrop(document.getElementById('dropTarget'));
```

After this, interaction with Resumable.js is done by listening to events:

```js
r.on('fileAdded', function(file){
    ...
  });
r.on('fileSuccess', function(file,message){
    ...
  });
r.on('fileError', function(file, message){
    ...
  });
```

------

# How do I set it up with my server?

这里是服务器端配置（处理HTTP请求）

Most of the magic for Resumable.js happens in the user’s browser, but files still need to be reassembled from chunks on the server side. This should be a fairly simple task and can be achieved in any web framework or language, which is able to receive file uploads.

To handle the state of upload chunks, a number of extra parameters are sent along with all requests:

- `resumableChunkNumber`: The index of the chunk in the current upload. First chunk is `1` (no base–0 counting here).
- `resumableChunkSize`: The general chunk size. Using this value and `resumableTotalSize` you can calculate the total number of chunks. Please note that the size of the data received in the HTTP might be lower than `resumableChunkSize` of this for the last chunk for a file.
- `resumableTotalSize`: The total file size.
- `resumableIdentifier`: A unique identifier for the file contained in the request.
- `resumableFilename`: The original file name (since a bug in Firefox results in the file name not being transmitted in chunk multipart posts).
- `resumableRelativePath`: The file’s relative path when selecting a directory (defaults to file name in all browsers except Chrome).

You should allow for the same chunk to be uploaded more than once; this isn’t standard behaviour, but on an unstable network environment it could happen, and this case is exactly what Resumable.js is designed for.

For every request, you can confirm reception in HTTP status codes:

- `200`: The chunk was accepted and correct. No need to re-upload.
- `415`. `500`, `501`: The file for which the chunk was uploaded is not supported, cancel the entire upload (in fact, any >=400 HTTP status code will trigger this result, [see details](https://twitter.com/#!/guan/status/131056635341844480).
- *Anything else*: Something went wrong, but try reuploading the file.

## Handling GET (or `test()` requests)

This will allow uploads to be resumed after browser restarts and even across browsers (in theory you could even run the same file upload across multiple tabs or different browsers). The `POST` data requests listed are required to use Resumable.js to receive data, but you can extend support by implementing a corresponding `GET` request with the same parameters:

- If this request returns a `200` HTTP code, the chunks is assumed to have been completed.
- If the request returns anything else, the chunk will be uploaded in the standard fashion.

------

# Full documentation

### Resumable

#### Configuration

The object is loaded with a configuation hash:

```
var r = new Resumable({opt1:'val', ...});
```

Available configuration options are:

- `target` The target URL for the multipart POST request (Default: `/`)
- `chunkSize` The size in bytes of each uploaded chunk of data (Default: `1*1024*1024`)
- `simultaneousUploads` Number of simultaneous uploads (Default: `3`)
- `fileParameterName` The name of the multipart POST parameter to use for the file chunk (Default: `file`)
- `query` Extra parameters to include in the multipart POST with data. This can be an object or a function. If a function, it will be passed a ResumableFile object (Default: `{}`)
- `headers` Extra headers to include in the multipart POST with data (Default: `{}`)
- `prioritizeFirstAndLastChunk` Prioritize first and last chunks of all files. This can be handy if you can determine if a file is valid for your service from only the first or last chunk. For example, photo or video meta data is usually located in the first part of a file, making it easy to test support from only the first chunk. (Default: `false`)
- `testChunks` Make a GET request to the server for each chunks to see if it already exists. If implemented on the server-side, this will allow for upload resumes even after a browser crash or even a computer restart. (Default: `true`)
- `generateUniqueIdentifier` Override the function that generates unique identifiers for each file. (Default: `null`)
- `maxFiles` Indicates how many files can be uploaded in a single session. Valid values are any positive integer and `undefined` for no limit. (Default: `undefined`)
- `maxFilesErrorCallback` A function which displays the *please upload n file(s) at a time* message. (Default: displays an alert box with the message *Please n one file(s) at a time.*)

#### Properties

- `.support` A boolean value indicator whether or not Resumable.js is supported by the current browser.
- `.opts` A hash object of the configuration of the Resumable.js instance.
- `.files` An array of `ResumableFile` file objects added by the user (see full docs for this object type below).

#### Methods

- `.assignBrowse(domNodes, isDirectory)` Assign a browse action to one or more DOM nodes. Pass in `true` to allow directories to be selected (Chrome only).
- `.assignDrop(domNodes)` Assign one or more DOM nodes as a drop target.
- `.on(event, callback)` Listen for event from Resumable.js (see below)
- `.upload()` Start or resume uploading.
- `.pause()` Pause uploading.
- `.cancel()` Cancel upload of all `ResumableFile` objects and remove them from the list.
- `.progress()` Returns a float between 0 and 1 indicating the current upload progress of all files.
- `.isUploading()` Returns a boolean indicating whether or not the instance is currently uploading anything.
- `.removeFile(file)` Cancel upload of a specific `ResumableFile` object on the list from the list.
- `.getFromUniqueIdentifier(uniqueIdentifier)` Look up a `ResumableFile` object by its unique identifier.
- `.getSize()` Returns the total size of the upload in bytes.

#### Events

- `.fileSuccess(file)` A specific file was completed.
- `.fileProgress(file)` Uploading progressed for a specific file.
- `.fileAdded(file)` A new file was added.
- `.fileRetry(file)` Something went wrong during upload of a specific file, uploading is being retried.
- `.fileError(file, message)` An error occured during upload of a specific file.
- `.complete()` Uploading completed.
- `.progress()` Uploading progress.
- `.error(message, file)` An error, including fileError, occured.
- `.pause()` Uploading was paused.
- `.cancel()` Uploading was canceled.
- `.catchAll(event, ...)` Listen to all the events listed above with the same callback function.

### ResumableFile

#### Properties

- `.resumableObj` A back-reference to the parent `Resumable` object.
- `.file` The correlating HTML5 `File` object.
- `.fileName` The name of the file.
- `.relativePath` The relative path to the file (defaults to file name if relative path doesn’t exist)
- `.size` Size in bytes of the file.
- `.uniqueIdentifier` A unique identifier assigned to this file object. This value is included in uploads to the server for reference, but can also be used in CSS classes etc when building your upload UI.
- `.chunks` An array of `ResumableChunk` items. You shouldn’t need to dig into these.

#### Methods

- `.progress(relative)` Returns a float between 0 and 1 indicating the current upload progress of the file. If `relative` is `true`, the value is returned relative to all files in the Resumable.js instance.
- `.abort()` Abort uploading the file.
- `.cancel()` Abort uploading the file and delete it from the list of files to upload.
- `.retry()` Retry uploading the file.
- `.bootstrap()` Rebuild the state of a `ResumableFile` object, including reassigning chunks and XMLHttpRequest instances.

## Alternatives

This library is explicitly designed for modern browsers supporting advanced HTML5 file features, and the motivation has been to provide stable and resumable support for large files (allowing uploads of several GB files through HTTP in a predictable fashion).

If your aim is just to support progress indications during upload/uploading multiple files at once, Resumable.js isn’t for you. In those cases, [SWFUpload](http://swfupload.org/) and [Plupload](http://plupload.com/)provides the same features with wider browser support.
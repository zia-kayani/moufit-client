import React from 'react'

function DocumentForm() {
  return (
    <div>
<label>Upload Trade License</label>
<br />
<input
                  type="file"
                  placeholder="Upload file"
                  className="input-feild"
                  // value={file}
                  required
                  name="file"
                  accept="image/png, image/jpeg"
                //   onChange={(event) => {
                //     setFieldValue("file", event.currentTarget.files[0]);
                //   }}
                /><br/>
                <label>Upload National ID (Emirates ID, or Passport copy with VISA)</label>
                <br/>
                <input
                  type="file"
                  required
                  placeholder="Upload file2"
                  className="input-feild"
                  name="file2"
                  accept="image/png, image/jpeg"
                //   onChange={(event) => {
                //     setFieldValue("file2", event.currentTarget.files[0]);
                //   }}
                /><br/>
    </div>
  )
}

export default DocumentForm
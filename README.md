# UnzipGs

<a name="top"></a>

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

**This is a GAS library for unzipping a Zip file protected by a password using Google Apps Script.**

<a name="description"></a>

# Description

Recently, I had a situation that it is required to unzip a Zip file protected with the password. But unfortunately, in the current stage, the method of [`Utilities.unzip()`](https://developers.google.com/apps-script/reference/utilities/utilities#unzipblob) cannot unzip such protected files. So when I had been looking for the other workarounds, I found [`zlib.js`](https://github.com/imaya/zlib.js). Especially, it's [`unzip.min.js`](https://github.com/imaya/zlib.js/blob/develop/bin/unzip.min.js). This is created for Javascript. So when I used this using Google Apps Script, it was found that it didn't work for Google Apps Script. So I prepared a wrapper script for running it with Google Apps Script. And when I created the wrapper script, I thought that under the current stage, if the protected Zip file can be unzipped, this will be useful for other users. So I created this as a GAS library.

# Library's project key

```
1yeBx1bM_6T-Tt2S3e-wxSgphR2QdhM7r0YRYAUTXzDkbRIrvJdHNZT0R
```

# How to install

- Open Script Editor. And please operate follows by click.
- -> Resource
- -> Library
- -> Input Script ID to text box. Script ID is **`1yeBx1bM_6T-Tt2S3e-wxSgphR2QdhM7r0YRYAUTXzDkbRIrvJdHNZT0R`**.
- -> Add library
- -> Please select latest version
- -> Developer mode ON (If you don't want to use latest version, please select others.)
- -> Identifier is "**`UnzipGs`**". This is set under the default.

[If you want to read about Libraries, please check this.](https://developers.google.com/apps-script/guide_libraries).

## About scopes

This library uses no scopes.

# Methods

In the current stage, there are 2 methods.

1. [unzip(blob, object)](#unzip)

2. [getFilenames(blob, object)](#getfilenames)

<a name="unzip"></a>

## 1. unzip(blob, object)

This method unzips a Zip file. `blob` is the file blob of the Zip file. The protected Zip file can be unzipped by setting the password to `object`. The response value is `[]blob` including the file blobs.

**If `password` is not included in `object`, the zip file is decompressed using `Utilities.unzip()`.**

### Sample script

```javascript
function sample() {
  var id = "###"; // File ID of Zip file.
  var pass = "###"; // Password.

  var blob = DriveApp.getFileById(id).getBlob();
  var res = UnzipGs.unzip(blob, { password: pass }); // or UnzipGs.unzip(blob);
  res.forEach(function(e) {
    Logger.log(
      "filename: %s, mimeType: %s, size: %s",
      e.getName(),
      e.getContentType(),
      e.getBytes().length
    );
  });
}
```

<a name="getfilenames"></a>

## 2. getFilenames(blob, object)

This method retrieves the filenames in the Zip file. There are no methods for retrieving the filenames from the Zip file in Google Apps Script. So I added this. This also uses zlib.js.

### Sample script

```javascript
function sample() {
  var id = "###"; // File ID of Zip file.
  var pass = "###"; // Password.

  var blob = DriveApp.getFileById(id).getBlob();
  var res = UnzipGs.getFilenames(blob, { password: pass }); // or UnzipGs.getFilenames(blob);
  Logger.log(res);
}
```

# Process cost

About the process cost for decompressing, the cost of `UnzipGs.unzip()` is much higher than that of `Utilities.unzip()`.

- For example, in my environment, when a protected Zip file with the size of 1 MB is unzipped using this library, the process time was about 60 seconds to 90 seconds.

- On the other hand, when `Utilities.unzip()` is used for the same file without the password, the process time was about 1 second.

# IMPORTANT

- When this library is used, please be careful the file size of the Zip file and unzipped files. Because the maximum size of blob which can be used for Google Apps Script is 50 MB (52,428,800 bytes).

- **But, when the Zip file is unzipped without using `Utilities.unzip()` by Google Apps Script, the process cost becomes very high. So I think that the practical size will be required to become smaller.**

- By this situation, unfortunately, I couldn't implement the method for zipping.

- **The reason of this issue is due to the process of Google Apps Script. For example, if v8 engine can be used with Google Apps Script in the future, this situation will be changed. I would like to expect this.**

- Or Google might also update `Utilities.unzip()` by including the method for decompressing the protected Zip file in the future.

# Acknowledgement

- [Imaya Yuta](https://github.com/imaya): He is the author of [zlib.js](https://github.com/imaya/zlib.js).
  - This library (UnzipGs) uses [`unzip.min.js`](https://github.com/imaya/zlib.js/blob/develop/bin/unzip.min.js) of `zlib.js`. So this library is a wrapper script for running `unzip.min.js`, which is for Javascript, with Google Apps Script.

---

<a name="Licence"></a>

# Licence

[MIT](LICENCE)

<a name="Author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to contact me.

<a name="Update_History"></a>

# Update History

- v1.0.0 (July 26, 2019)

  1. Initial release.

- v1.0.1 (April 22, 2021)

  1. A bug was removed. [Ref](https://github.com/tanaikech/UnzipGs/issues/3)

# Testing
- September 16, 2020: When I used a sample zip file with the password, I could confirm that the script worked. But, unfortunately, it seems that `unzip.min.js` cannot be used with v8 runtime. So when this library is used, please disable V8 runtime at the script editor.

[TOP](#top)

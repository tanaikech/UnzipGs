// This GAS library uses zlib.js (https://github.com/imaya/zlib.js).
/**
 * GitHub  https://github.com/tanaikech/UnzipGs<br>
 * Library name
 * @type {string}
 * @const {string}
 * @readonly
 */
var appName = "UnzipGs";

/**
 * Unzip.<br>
 * @param {object} blob Blob of ZIP file.
 * @param {object} options Options for unzipping.
 * @return {object} Response
 */
function unzip(blob, options) {
    return new UnzipGs().Unzip(blob, options);
}

/**
 * GetFilenames.<br>
 * @param {object} blob Blob of ZIP file.
 * @param {object} options Options for unzipping.
 * @return {object} Response
 */
function getFilenames(blob, options) {
    return new UnzipGs().GetFilenames(blob, options)[1];
}
;
(function(r) {
  var UnzipGs;
  UnzipGs = (function() {
    var blob2Byte, str2Byte, toGas, toJs;

    UnzipGs.name = appName;

    function UnzipGs() {
      this.name = appName;
    }

    UnzipGs.prototype.Unzip = function(blob_, options_) {
      var e, er, err, fileNames, ref, result, unzip;
      if (blob_.toString() !== "Blob") {
        throw new Error("Please set a file blob of zip file.");
      }
      if (!options_ || Object.keys(options_).length === 0 || !options_.password || !("password" in options_)) {
        return Utilities.unzip(blob_);
      }
      ref = this.GetFilenames(blob_, options_), unzip = ref[0], fileNames = ref[1];
      try {
        result = fileNames.map(function(n) {
          return (toGas.call(this, unzip.decompress(n))).setName(n).setContentTypeFromExtension();
        });
      } catch (error) {
        e = error;
        err = [e];
        try {
          result = Utilities.unzip(blob_);
        } catch (error) {
          er = error;
          err.push(er);
          throw err;
        }
      }
      return result;
    };

    UnzipGs.prototype.GetFilenames = function(blob_, options_) {
      var e, fileNames, keys, unzip;
      if (options_ && typeof options_ === "object") {
        keys = Object.keys(options_);
        if (keys.length > 0) {
          keys.forEach(function(e) {
            options_[e] = str2Byte.call(this, options_[e]);
          });
        }
      }
      try {
        unzip = unzipminjs.Unzip(blob2Byte.call(this, blob_), options_);
        fileNames = unzip.getFilenames();
      } catch (error) {
        e = error;
        throw e;
      }
      return [unzip, fileNames];
    };

    str2Byte = function(str_) {
      return toJs.call(this, Utilities.newBlob(str_.toString(), MimeType.PLAIN_TEXT).getBytes());
    };

    blob2Byte = function(blob_) {
      return toJs.call(this, blob_.getBytes());
    };

    toJs = function(ar_) {
      return ar_.map(function(e) {
        var res;
        res = e < 0 ? e + 256 : e;
        return res;
      });
    };

    toGas = function(ar_) {
      var a;
      a = ar_.map(function(e) {
        var res;
        res = e > 128 ? e - 256 : e;
        return res;
      });
      return Utilities.newBlob(a);
    };

    return UnzipGs;

  })();
  return r.UnzipGs = UnzipGs;
})(this);

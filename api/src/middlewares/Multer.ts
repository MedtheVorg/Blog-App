import multer from 'multer';

// multer storage config
const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default function multerMiddleware(filename: string) {
  return upload.single(filename);
}

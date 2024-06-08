package com.timetablescheduling.backend.utils.file;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {
    @Autowired
    FileStorageImpl storageService;
    @Autowired
    private ResourceLoader resourceLoader;

//    @PostMapping("/upload")
//    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
//        String message = "";
//        try {
//            storageService.save(file);
//
//            message = "Uploaded the file successfully: " + file.getOriginalFilename();
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//        } catch (Exception e) {
//            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
//            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//        }
//    }

//    @GetMapping("/files")
//    public ResponseEntity<List<FileInfo>> getListFiles() {
//        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
//            String filename = path.getFileName().toString();
//            String url = MvcUriComponentsBuilder
//                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();
//
//            return new FileInfo(filename, url);
//        }).collect(Collectors.toList());
//
//        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
//    }
//
//    //Down
//    @GetMapping("/{filename:.+}")
//    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//        Resource file = resourceLoader.getResource("file:images/" + filename);
//        return ResponseEntity.ok()
//                .body(file);
//    }
}


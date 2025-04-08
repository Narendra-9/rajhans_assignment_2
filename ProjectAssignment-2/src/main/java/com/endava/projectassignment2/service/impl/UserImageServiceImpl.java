package com.endava.projectassignment2.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;

import com.endava.projectassignment2.dto.ImageResponseDto;
import com.endava.projectassignment2.enums.ErrorMessage;
import com.endava.projectassignment2.exception.FileDeleteException;
import com.endava.projectassignment2.exception.FileSavingFailedException;
import com.endava.projectassignment2.exception.RecordNotFoundException;
import com.endava.projectassignment2.model.UserImage;
import com.endava.projectassignment2.repository.UserImageRepository;
import com.endava.projectassignment2.repository.UserRepository;
import com.endava.projectassignment2.service.UserImageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserImageServiceImpl implements UserImageService {

    private final UserImageRepository userImageRepository;
    
    private final UserRepository userRepository;
    
    private static final String FOLDER_PATH = "./uploads";
    
    private static final List<String> ALLOWED_EXTENSIONS = List.of(".png", ".jpg");
    
    // Method to Upload ProfilePhoto.
    // I have a doubt, i need to know how to avail transactional in spring webflux.
    @Override
    public Mono<Void> uploadProfilePhoto(long userId, FilePart file) {

        return userImageRepository.findByUserId(userId)
        		
        		// deleting the previous image file in folder if exists.
                .flatMap(existingImage -> deleteFile(existingImage.getFilePath())
                		// And Also deleting the file path from the repository too.
                        .then(userImageRepository.delete(existingImage)))
                
                // Getting the user from the DB ( Checking he is present or not )
                .then(userRepository.findById(userId))
                .switchIfEmpty(Mono.error( new RecordNotFoundException(ErrorMessage.USER_NOT_FOUND.getMessage())))
                
                // Passing username and file to save the image with that name.
                .flatMap(user->saveFile(file,user.getFirstName()+"_"+user.getLastName()))
                
                // Getting the filepath and storing it in the DB.
                .flatMap(filePath -> {
                    UserImage newUserImage = UserImage.builder()
                            .userId(userId)
                            .name(file.filename())
                            .type(file.headers().getContentType().toString())
                            .filePath(filePath)
                            .build();
                    return userImageRepository.save(newUserImage);
                })
                .then();
    }

    @Override
    public Mono<ImageResponseDto> getProfilePhoto(long userId) {
        return userImageRepository.findByUserId(userId)
                .switchIfEmpty(Mono.error(new RecordNotFoundException(ErrorMessage.FILE_NOT_FOUND.getMessage())))
                
                .flatMap(userImage -> {
                	
                    Path path = Paths.get(userImage.getFilePath());
                    
                    if (!Files.exists(path)) {
                        return Mono.error(new RecordNotFoundException("File not found at: " + userImage.getFilePath()));
                    }
                    
                    return Mono.fromCallable(() -> {
                    	byte[] imageUrl= Files.readAllBytes(path);
                    	
                    	return ImageResponseDto.builder().contentType(userImage.getType()).imageUrl(imageUrl).build();
                    })
                    		//Making it run on different thread so it wont block the main thread.
                            .subscribeOn(Schedulers.boundedElastic());
                });
    }

    //Method to save the image.
    private Mono<String> saveFile(FilePart file , String username ) {
        return Mono.fromCallable(() -> {
        	
            File directory = new File(FOLDER_PATH);
            
            //Checking if directory exists if not creating a new one.
            if (!directory.exists() && !directory.mkdirs()) {
            	
            	log.error("Failed to create directory: {}", FOLDER_PATH);
            	
                throw new FileSavingFailedException("Failed to create directory: " + FOLDER_PATH);
            }
            
            String originalFilename = file.filename();
            String extension = getFileExtension(originalFilename);
            
            // It only allows .jpg and .png files.
            if (!ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
                throw new FileSavingFailedException("Unsupported file type: " + extension);
            }
            
            String fileName = username + extension;

            return Paths.get(FOLDER_PATH , fileName).toFile();
        })
        		
        // transferring content from source file to destination file and returning the absolute path to store it in DB.
        .flatMap(destinationFile -> file.transferTo(destinationFile)
        		//Making it run on different thread so it wont block the main thread.
        		.subscribeOn(Schedulers.boundedElastic())
                .thenReturn(destinationFile.getAbsolutePath()))
        
        // If any Error occurs mapping it to the custom error.
        .onErrorMap(e -> new FileSavingFailedException(e.getMessage()));
    }
    
    
    //Method to delete file from the directory.
    private Mono<Void> deleteFile(String filePath) {
    	
        if (filePath == null || filePath.isEmpty()) {
            return Mono.empty();
        }
        
        return Mono.fromRunnable(() -> {
            try {
                Path path = Paths.get(filePath);
                if (Files.exists(path)) {
                    Files.delete(path);
                }
            } catch (IOException e) {

                throw new FileDeleteException(e.getMessage());
            }
        // Making it run on different thread, so that it wont block the main thread.
        }).subscribeOn(Schedulers.boundedElastic()).then();
    }
    
    
    // Helper method to extractFileExtension.
    private String getFileExtension(String filename) {
        int lastIndex = filename.lastIndexOf('.');
        if (lastIndex == -1) {
            throw new FileSavingFailedException(ErrorMessage.INVALID_FILE_FORMAT.getMessage());
        }
        return filename.substring(lastIndex).toLowerCase();
    }

}

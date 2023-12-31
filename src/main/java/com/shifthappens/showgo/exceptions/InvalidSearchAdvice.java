package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

//Advice for InvalidSearchException
@ControllerAdvice
public class InvalidSearchAdvice {

  @ResponseBody
  @ExceptionHandler(InvalidSearchException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String invalidSearchExceptionHandler(InvalidSearchException ex) {
    return ex.getMessage();
  }
}
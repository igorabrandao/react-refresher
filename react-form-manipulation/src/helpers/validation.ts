export const validateEmail = (email: string) => {
  const result = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  /*
   * This will convert to true/false depending on if matches are found.
   * No matches gives you null, which is converted to false.
   * One or more matches gives you an Array, which is converted to true.
   */
  return !!result;
};

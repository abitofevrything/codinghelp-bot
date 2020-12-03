import java.util.Random;
import java.util.Scanner;

public class Day2 {
 public static void main(String[] args) {
 //Get input (name) from user and display: Merry Christmas (name)
 Scanner myScanner = new Scanner(System.in);
 System.out.print("Want to pull a cracker?(Yes/No): ");
 String inputString = myScanner.nextLine();
 
 String[] jokes = {
 "What did you do to make you code work?\nI don't really know all I care is that it works!",
 "Why did the Programmer quit? \nHe didn't get arrays",
 "Damn I cant get this code to work.\nsadness++",
 "Teslas be like don'tCrash()",
 "\"Algorithm(Noun)\" Word used by programmers when they don't want to explain code"};

 String[] prize = {
 "Here is some sleep, you been coding for too long",
 "Coffee, you'll need it for the all nighter",
 "New keyboard, because you broke the last one because of a bug :P",
 "Blue light glasses, for the all nighters for coding of course ;)"
 };

 if (inputString.equalsIgnoreCase("Yes")) {
 System.out.println("\nJoke:\n" + jokes[numSelector()]);
 System.out.println("\nYour prize:\n" + prize[numSelector()]);
 } else {
 System.out.println("You boring :P");
 }
 }

 public static int numSelector() {
 Random rand = new Random();
 int randNum = rand.nextInt(4);
 return randNum;
 }
}
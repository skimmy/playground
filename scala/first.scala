def readCsv(fp : String): Array[String] = {
	/**
		Returns an array with one element per line
	**/
	import scala.io.Source
	val src = Source.fromFile(fp)
	src.getLines.toArray
}

val name = "You"
val greet = s"Hello ${name}!"
println(greet)

val message = "Ko"
val str = message match {
	case "Ok" => "Good"
	case _ => "Bad" 
}

val digits = for(i <- 0 to 9) yield i
val odd    = for(i <- digits if i%2>0) yield i
val even   = for(i <- digits if i%2==0) yield i

val header : String = "ID,price,amount"
for (s <- header.split(",")) yield println(s)

import scala.io.Source
// Open a file (CSV format)
val src = Source.fromFile("/Users/skimmy/av/v4/deviato.csv")
// read all lines into an array
val lines = src.getLines.toArray
// get the header of tbe CSV
val header = lines(0).split(",")
val idev = header.indexOf("% dev")
val N = lines.size - 1
var avg : Double = 0
val idx = 6
for (i <- 1 to N; line = lines(i).split(",")) {
	val dev = line(6).toDouble
	val con = lines(i).split(",")(4).toDouble // without value-binding
	avg += (dev / con)
}
println(avg/N)

val headerC = readCsv("/Users/skimmy/av/v4/colata.csv")

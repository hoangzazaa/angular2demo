name := "SEFURI_Salesfront"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  javaJpa
)

// mysql driver
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.39"
// hibernate mapping
libraryDependencies += "org.hibernate" % "hibernate-entitymanager" % "5.2.1.Final"
libraryDependencies += "dom4j" % "dom4j" % "1.6.1" intransitive()
libraryDependencies += "org.jadira.usertype" % "usertype.core" % "6.0.1.GA"
// jasper library
libraryDependencies += "org.olap4j" % "olap4j" % "1.2.0"
libraryDependencies += "net.sf.jasperreports" % "jasperreports" % "6.2.0"
libraryDependencies += "commons-digester" % "commons-digester" % "1.7"
libraryDependencies += "com.lowagie" % "itext" % "2.1.7"
libraryDependencies += "com.itextpdf" % "itext-asian" % "5.2.0"
// https://mvnrepository.com/artifact/net.sf.jasperreports/jasperreports-fonts
libraryDependencies += "net.sf.jasperreports" % "jasperreports-fonts" % "6.0.0"
// jwt library
libraryDependencies += "com.auth0" % "java-jwt" % "2.2.1"
// commons library
libraryDependencies += "org.apache.commons" % "commons-lang3" % "3.4"
libraryDependencies += "commons-io" % "commons-io" % "2.5"
// jackson mapping support
libraryDependencies += "com.fasterxml.jackson.datatype" % "jackson-datatype-joda" % "2.7.6"
// enable evolution
libraryDependencies += evolutions
// Math Util
libraryDependencies += "org.apache.commons" % "commons-math" % "2.2"
// apache common email
libraryDependencies += "org.apache.commons" % "commons-email" % "1.4"
// play framework's mailer, use `5.0.0` for play 2.5
libraryDependencies += "com.typesafe.play" %% "play-mailer" % "5.0.0"
// aws sdk
libraryDependencies += "com.amazonaws" % "aws-java-sdk" % "1.11.76"

// test config
testOptions += Tests.Argument(TestFrameworks.JUnit, "-v", "-q", "-a")
// https://mvnrepository.com/artifact/org.apache.activemq/activemq-pool
libraryDependencies += "org.apache.activemq" % "activemq-client" % "5.14.4"
// https://mvnrepository.com/artifact/net.coobird/thumbnailator
libraryDependencies += "net.coobird" % "thumbnailator" % "0.4.8"
// https://mvnrepository.com/artifact/org.ghost4j/ghost4j
libraryDependencies += "org.ghost4j" % "ghost4j" % "1.0.0"
// https://mvnrepository.com/artifact/net.java.dev.jna/jna
libraryDependencies += "net.java.dev.jna" % "jna" % "3.4.0"

// jacoco coverage setting
jacoco.settings
jacoco.excludes in jacoco.Config := Seq("router*", "*Routes*", "controllers*")

// For Eclipse
// Ref. https://qiita.com/yamakz5555/items/0391a9f384a248ebea2d
EclipseKeys.preTasks := Seq(compile in Compile)
EclipseKeys.projectFlavor := EclipseProjectFlavor.Java
EclipseKeys.createSrc := EclipseCreateSrc.ValueSet(EclipseCreateSrc.ManagedClasses, EclipseCreateSrc.ManagedResources)


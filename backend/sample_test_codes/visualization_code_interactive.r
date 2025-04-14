library(ggplot2)

data <- data.frame(
  x = c(1, 2, 3, 4, 5),
  y = c(10, 15, 13, 18, 20)
)

png('output/visualization.png')
ggplot(data, aes(x=x, y=y)) + geom_line(color="blue") + geom_point()
dev.off()

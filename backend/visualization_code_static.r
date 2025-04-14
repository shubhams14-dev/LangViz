library(ggplot2)

data <- data.frame(
  x = c('A', 'B', 'C', 'D'),
  y = c(10, 24, 36, 18)
)

png('output/visualization.png')
ggplot(data, aes(x=x, y=y)) + geom_bar(stat="identity", fill="skyblue")
dev.off()

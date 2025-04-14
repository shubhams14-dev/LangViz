library(plot3D)

x <- seq(-10, 10, length.out=30)
y <- seq(-10, 10, length.out=30)
z <- outer(x, y, function(x, y) sin(sqrt(x^2 + y^2)))

png('output/visualization.png')
persp3D(x, y, z, col = "lightblue")
dev.off()

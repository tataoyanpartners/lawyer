"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/lib/actions";
import { Blogs } from "@/types/items";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DocumentTextIcon,
  EyeIcon,
  CalendarIcon,
  TrendingUpIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const blogData = await fetchBlogs();
        if (blogData) {
          setBlogs(blogData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const totalPosts = blogs.length;
  const thisWeekPosts = blogs.filter(blog => {
    if (!blog.createTime) return false;
    const postDate = new Date(blog.createTime);
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());
    return postDate >= weekStart && postDate <= weekEnd;
  }).length;

  const thisMonthPosts = blogs.filter(blog => {
    if (!blog.createTime) return false;
    const postDate = new Date(blog.createTime);
    return postDate.getMonth() === new Date().getMonth() && 
           postDate.getFullYear() === new Date().getFullYear();
  }).length;

  const recentPosts = blogs
    .filter(blog => blog.createTime)
    .sort((a, b) => new Date(b.createTime!).getTime() - new Date(a.createTime!).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-100 rounded animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Posts</p>
                <p className="text-3xl font-bold text-blue-900">{totalPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">This Month</p>
                <p className="text-3xl font-bold text-green-900">{thisMonthPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">This Week</p>
                <p className="text-3xl font-bold text-purple-900">{thisWeekPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-600">Total Views</p>
                <p className="text-3xl font-bold text-yellow-900">-</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-4">Create your first blog post to get started</p>
                  <Link href="/admin/blog">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title_en || post.title_am}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {post.title_en || post.title_am}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post.description_en || post.description_am}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Published
                          </Badge>
                          {post.createTime && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              {format(new Date(post.createTime), "MMM d, yyyy")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/blog">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
              <Link href="/admin/blog">
                <Button variant="outline" className="w-full justify-start">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Manage Posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Website Traffic */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Website Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Page Views</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unique Visitors</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bounce Rate</span>
                  <span className="font-medium">-</span>
                </div>
                <Separator />
                <p className="text-xs text-gray-500">
                  Analytics integration coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
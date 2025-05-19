﻿Imports Microsoft.VisualBasic

Public Class BasePage : Inherits System.Web.UI.Page

    Protected Overrides Sub OnLoad(ByVal e As System.EventArgs)
        Dim Bll As New BusinessLogicLayer
        If Session("User") Is Nothing Then
            Response.Redirect("~/webadmin.aspx")
        ElseIf Session("User") = "User" Then
       
        ElseIf Session("User") = "Admin" Then

        ElseIf Session("User") = "Student" Then
        ElseIf Session("User") = "Employee" Then
        ElseIf Session("User") = "Parent" Then
        Else
            Session.Abandon()
            Response.Redirect("~/Login.aspx/")
        End If
        MyBase.OnLoad(e)
    End Sub
    Protected Overrides Sub OnError(ByVal e As System.EventArgs)
        If HttpContext.Current.Request.IsLocal Then
            MyBase.OnError(e)
            Dim objErr As Exception = Server.GetLastError().GetBaseException()
            Dim templateVars As New Hashtable()
            templateVars.Add("ErrorIn", Request.Url.ToString())
            templateVars.Add("ErrorMsg", objErr.Message)
            templateVars.Add("StackTrace", objErr.StackTrace)
            Email.SendEmail("error.htm", templateVars, System.Configuration.ConfigurationManager.AppSettings("email"), System.Configuration.ConfigurationManager.AppSettings("errormail"), "Error")
        End If
    End Sub
End Class
